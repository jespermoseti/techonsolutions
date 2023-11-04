import { sendFile } from 'next/dist/next-server/server/send-file';

export default async (req, res) => {
  const { file } = req.query; // Get the "file" query parameter

  // Define the directory where your files are located
  const fileDirectory = 'public/images/';
  
  // Specify the path to your PDF or DOCX or img file within the "public" directory if not using query parameter
  //const filePath = 'public/files/document.pdf'; // Adjust the file path as needed 

  // Construct the full file path based on the query parameter
  const filePath = `${fileDirectory}${file}`;
  
  // Serve the file
  await sendFile(req, res, filePath);
};
