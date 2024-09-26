
import { Button } from '@/components/ui/button';
import { Image } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import SpacialLoadingButton from './SpacialLoadingButton';
import { addNewSoftwareApplication, clearAllApplicationSliceErrors, getAllSoftwareApplication } from '@/store/slices/softwareApplicationSlice';

function AddApplication() {

  const [name, setName] = useState("");
  const [proficiency, setProficiency] = useState("");
  const [svg, setSvg] = useState(null);
  const [svgPreview, setSvgPreview] = useState("");



  const handleSvg = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setSvg(file);
      setSvgPreview(reader.result);
    };
  };

  const { loading, error, message } = useSelector((state) => state.application);
  const dispatch = useDispatch();
  const handleAddNewApplication = (e) => {
    e.preventDefault();
    const formData = new FormData(); 
    formData.append("name",name);
    formData.append("svg",svg);
    dispatch(addNewSoftwareApplication(formData))
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
     dispatch(clearAllApplicationSliceErrors());
     dispatch(getAllSoftwareApplication())
    }
    if (message) {
      toast.success(message);
     
    }
  }, [dispatch, error, message]);


  return (
    <>
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleAddNewApplication} className="w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Add New Software Application</h2>

        <div className="mt-4">
          <label className="block text-sm font-medium mb-4">Software Application Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full border rounded-md"
            required
          />
        </div>

        

        <div className="col-span-full mt-4 mb-4">
          <label className="block text-sm font-medium leading-6 text-gray-900 mb-4">Software Application SVG</label>
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
              Add Application
            </Button>
          )}
        </div>
      </form>
    </div>
    </>
  )
}

export default AddApplication