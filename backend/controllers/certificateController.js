import Certificate
from "../models/Certificate.js";

export const issueCertificate =
async(req,res)=>{

 try{

  const {
   courseId
  } = req.body;

  const certificate =
   await Certificate.create({

    userId:req.user.id,

    courseId

   });

  res.status(201).json(
   certificate
  );

 }catch(error){

  console.log(
   "Certificate Error:",
   error
  );

  res.status(500).json({
   message:
   "Certificate Failed",
   error:error.message
  });

 }

};

export const getMyCertificates =
async(req,res)=>{

 try{

  const certificates =
   await Certificate.find({

    userId:req.user.id

   })

   .populate("courseId");

  res.json(
   certificates
  );

 }catch(error){

  console.log(
   "Get Certificates Error:",
   error
  );

  res.status(500).json({
   message:
   "Failed",
   error:error.message
  });

 }

};

// GET ALL CERTIFICATES (ADMIN)

export const getAllCertificates =
async(req,res)=>{

 try{

  const certificates =
   await Certificate.find()

   .populate("userId", "name email")

   .populate("courseId", "title")

   .sort({issuedAt:-1});

  res.json(
   certificates
  );

 }catch(error){

  console.log(
   "Get All Certificates Error:",
   error
  );

  res.status(500).json({
   message:
   "Failed to fetch certificates",
   error:error.message
  });

 }

};

// DELETE CERTIFICATE (ADMIN)

export const deleteCertificate =
async(req,res)=>{

 try{

  const { id } = req.params;

  const deleted =
   await Certificate.findByIdAndDelete(id);

  if(!deleted){

   return res.status(404).json({
    message:
    "Certificate not found"
   });

  }

  res.json({
   message:
   "Certificate deleted successfully",
   deleted
  });

 }catch(error){

  console.log(
   "Delete Certificate Error:",
   error
  );

  res.status(500).json({
   message:
   "Failed to delete certificate",
   error:error.message
  });

 }

};