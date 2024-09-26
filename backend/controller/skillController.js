import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js"; 
import {Skill} from "../model/skillSchema.js";
import cloudinary from 'cloudinary'; 

export const addNewSkill = catchAsyncErrors(async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Skill svg Required!", 400)); // Correct usage
    }
    const { svg } = req.files;
    const { title,proficiency } = req.body;

    if (!title || !proficiency) {
        return next(new ErrorHandler("Please fill full form", 400)); 
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(
        svg.tempFilePath,  
        { folder: "PORTFOLIO_SKILLS_SVGS" }
    );

    if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error("Cloudinary Error", cloudinaryResponse.error || "Unknown Cloudinary Error");
        return next(new ErrorHandler("Error uploading file to Cloudinary", 500)); // Proper error handling
    }

    const skill = await Skill.create({
        title,
        proficiency,
        svg: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        }
    });

    res.status(200).json({
        success: true,
        message: "New Skill Added!",
        skill,
    });
});

export const getAllSkills = catchAsyncErrors(async (req, res, next) => {
    const skill = await Skill.find();
    res.status(200).json({
        success: true,
        skill
    });
});

export const deleteSkill = catchAsyncErrors(async (req, res, next) => {
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
        return next(new ErrorHandler("Skill not found", 404)); // Correct error handling
    }

    // Remove the icon from Cloudinary
    await cloudinary.uploader.destroy(skill.svg.public_id);

    await skill.deleteOne();

    res.status(200).json({
        success: true,
        message: "Skill deleted!"
    });
});

export const updateSkill = catchAsyncErrors(async(req,res,next)=>{
const {id} = req.params;
let skill = await Skill.findById(id)
if(!skill){
    return next (new ErrorHandler("Skill Not Found!",404));
}
const {proficiency} = req.body;
skill = await Skill.findByIdAndUpdate(
    id,
    {proficiency},
    {
        new : true,
        runValidators:true,
        useFindAndModify:false,
    },
);
    res.status(200).json({
        success:true,
        message:"Skill Updated",
        skill,
    });

});

