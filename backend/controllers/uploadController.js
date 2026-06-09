import cloudinary
from "../config/cloudinary.js";

export const uploadImage =
async (req,res)=>{
console.log(req.file);
  try{

    if(!req.file){

      return res.status(400).json({
        message:"No file uploaded",
      });

    }

    const base64 =
      `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

    const result =
      await cloudinary.uploader.upload(
        base64,
        {
          folder:"lms-courses",
        }
      );

    res.status(200).json({

      message:
        "Image uploaded",

      imageUrl:
        result.secure_url,

    });

  }catch(error){

    console.log(error);

    res.status(500).json({
      message:
        "Upload failed",
    });

  }

};

export const uploadPdf =
async (req,res)=>{

  try{

    if(!req.file){

      return res.status(400).json({
        message:"No PDF uploaded",
      });

    }

    const base64 =
      `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

    const result =
      await cloudinary.uploader.upload(
        base64,
        {
          folder:"lms-pdfs",
          resource_type:"raw",
        }
      );

    res.status(200).json({

      message:"PDF uploaded",

      pdfUrl:
        result.secure_url,

    });

  }catch(error){

    console.log(error);

    res.status(500).json({
      message:"PDF Upload Failed",
    });

  }

};