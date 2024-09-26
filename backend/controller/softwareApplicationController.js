// import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
// import ErrorHandeler from "../middlewares/error.js";
// import { SoftwareApplication } from "../model/softwareSchema.js"


// export const addNewApplication = catchAsyncErrors(async(req,res,next)=>{
//     if(!req.files || Object.keys(req.files).length === 0 ){
//         return next (new ErrorHandler("Software Application Icon/svg Required!" ,400));
//     }
//     const {svg} = req.files;
//     const {name} = req.body;

//     if(!name){
//         return next (new ErrorHandeler("Softwere is Require",400))
//     }
//     const cloudinaryResponse = await cloudinary.uploader.upload(
//         avatar.tempFilePath,
//         {folder:"PORTFOLIO_SOFTWARE_APPLICATION"}
//     );
//     if(!cloudinaryResponse || cloudinaryResponse.error){
//         console.error(
//             "Cloudinary Error",
//             cloudinaryResponse.error || "Unknow Cloudanary Error"
//         );
//     }

//     const softwareApplication = await SoftwareApplication.create({
//         name,
//         svg:{
//             public_id: cloudinaryResponse.public_id,
//             url: cloudinaryResponse.secure_url,
//         }
//     });
//     res.status(200).json({
//         success:true,
//         message:"Software Application Added!",
//         softwareApplication,
//     })
// });
// export const getAllApplication = catchAsyncErrors(async(req,res,next)=>{});
// export const deleteApplication = catchAsyncErrors(async(req,res,next)=>{});

import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js"; // Correct import
import { SoftwareApplication } from "../model/softwareSchema.js";
import cloudinary from 'cloudinary'; // Ensure cloudinary is properly imported

export const addNewApplication = catchAsyncErrors(async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Software Application Icon/svg Required!", 400)); // Correct usage
    }
    const { svg } = req.files;
    const { name } = req.body;

    if (!name) {
        return next(new ErrorHandler("Software name is required", 400)); // Correct usage
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(
        svg.tempFilePath,  // Fixing incorrect variable (use svg, not avatar)
        { folder: "PORTFOLIO_SOFTWARE_APPLICATION" }
    );

    if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error("Cloudinary Error", cloudinaryResponse.error || "Unknown Cloudinary Error");
        return next(new ErrorHandler("Error uploading file to Cloudinary", 500)); // Proper error handling
    }

    const softwareApplication = await SoftwareApplication.create({
        name,
        svg: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        }
    });

    res.status(200).json({
        success: true,
        message: "Software Application Added!",
        softwareApplication,
    });
});

export const getAllApplication = catchAsyncErrors(async (req, res, next) => {
    const softwareApplications = await SoftwareApplication.find();
    res.status(200).json({
        success: true,
        softwareApplications
    });
});

export const deleteApplication = catchAsyncErrors(async (req, res, next) => {
    const application = await SoftwareApplication.findById(req.params.id);
    if (!application) {
        return next(new ErrorHandler("Application not found", 404)); // Correct error handling
    }

    // Remove the icon from Cloudinary
    await cloudinary.uploader.destroy(application.svg.public_id);

    await application.deleteOne();

    res.status(200).json({
        success: true,
        message: "Application deleted!"
    });
});
