import IPost from "../../interfaces/post.interface";
import BError from "../../classes/Error";
import { promises as fs } from "fs";
import { resolve } from "path";
import formidable from "formidable";

const uploadDir = resolve('./public/uploads');

// Создаем директорию для загрузок, если ее нет
fs.mkdir(uploadDir, { recursive: true });

export default defineEventHandler(async (event) => {
  console.log('[createPost] Got request');

  const form = formidable({ multiples: true, uploadDir, keepExtensions: true });

  const { fields, files } = await new Promise<{ fields: formidable.Fields; files: formidable.Files }>((resolve, reject) => {
    form.parse(event.node.req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });

  console.log('[createPost] Got fields and files: ', fields, files);

  const content = fields.content[0] as string;
  const userID = fields.userID[0] as string;

  if (!content || !userID) {
    setResponseStatus(event, 400, "Not enough arguments");
    return {};
  }

  let mediaUrls: string[] = [];

  if (files.media) {
    const mediaFile = Array.isArray(files.media) ? files.media[0] : files.media;
    const filename = mediaFile.newFilename;
    mediaUrls.push(`/uploads/${filename}`);
  }

  console.log('[createPost] Got mediaUrls: ' + mediaUrls);

  const post: IPost = {
    media: mediaUrls,
    userID,
    comments: [],
    likes: [],
    reposts: [],
    content,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  console.log('[createPost] Got post: ' + JSON.stringify(post));

  let newPost: IPost | BError;
  try {
    newPost = await createPost(post);
  } catch (e) {
    console.error(e);
    setResponseStatus(event, 500, "errors.server");
    return {};
  }

  console.log('[createPost] Got newPost: ' + JSON.stringify(newPost));

  if (!newPost || newPost instanceof BError) {
    setResponseStatus(event, 500, "errors.server");
    return {};
  }

  console.log('[createPost] Returning newPost');

  return newPost;
});