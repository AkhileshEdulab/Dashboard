
import { Button } from '@/components/ui/button';
import { addNewSkill, clearAllSkillErrors, getAllSkills } from '@/store/slices/skillSlice';
import { Image } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import SpacialLoadingButton from './SpacialLoadingButton';

const AddSkill = () => {
  const [title, setTitle] = useState("");
  const [proficiency, setProficiency] = useState("");
  const [svg, setSvg] = useState(null);
  const [svgPreview, setSvgPreview] = useState("");

  const { loading, error, message } = useSelector((state) => state.skill);

  const dispatch = useDispatch();

  const handleSvg = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setSvg(file);
      setSvgPreview(reader.result);
    };
  };

  const handleAddNewSkill = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("proficiency", proficiency);
    formData.append("svg", svg); 
    dispatch(addNewSkill(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllSkillErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(clearAllSkillErrors());
      dispatch(getAllSkills()); 
    }
  }, [dispatch, error, message]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleAddNewSkill} className="w-full max-w-md">
        <h2 className="text-2xl font-bold text-center">Add New Skill</h2>

        <div className="mt-4">
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full border rounded-md"
            
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium">Proficiency</label>
          <input
            type="text"
            value={proficiency}
            onChange={(e) => setProficiency(e.target.value)}
            className="mt-1 block w-full border rounded-md"
            
          />
        </div>

        <div className="col-span-full">
          <label className="block text-sm font-medium leading-6 text-gray-900">Skill SVG</label>
          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            <div className="text-center">
              {svgPreview ? (
                <img
                  src={svgPreview}
                  alt="SVG Preview"
                  className="m-auto h-12 w-12 rounded-3xl"
                />
              ) : (
                <Image className="mx-auto h-12 w-12  text-gray-300" aria-hidden />
              )}

              <div className="mt-4 flex text-sm leading-6 text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    onChange={handleSvg}
                    accept=".svg"
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs leading-5 text-gray-600">SVG only</p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          {loading ? (
            <SpacialLoadingButton width={"w-32"} content={"Adding"} />
          ) : (
            <Button type="submit" className="w-full">
              Add Skill
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddSkill;
