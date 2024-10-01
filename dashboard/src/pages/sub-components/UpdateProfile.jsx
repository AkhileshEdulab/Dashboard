

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { resetProfile, updateProfile, getUser, clearAllErrors } from '@/store/slices/userSlice';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';
import SpacialLoadingButton from './SpacialLoadingButton';

const UpdateProfile = () => {
  const { user, loading, error, message } = useSelector((state) => state.user);
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [aboutMe, setAboutMe] = useState(user?.aboutMe || '');
  const [portfolioURL, setPortfolioURL] = useState(user?.portfolioURL || '');
  const [githubURL, setGithubURL] = useState(user?.githubURL || '');
  const [linkedInURL, setLinkedInURL] = useState(user?.linkedInURL || '');
  const [instagramURL, setInstagramURL] = useState(user?.instagramURL || '');
  const [twitterURL, setTwitterURL] = useState(user?.twitterURL || '');
  const [facebookURL, setFacebookURL] = useState(user?.facebookURL || '');
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar?.url || '');
  const [resume, setResume] = useState(null);
  const [resumePreview, setResumePreview] = useState(user?.resume?.url || '');

  
  const avatarHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result);
      setAvatar(file);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const resumeHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setResumePreview(reader.result);
      setResume(file);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('aboutMe', aboutMe);
    formData.append('portfolioURL', portfolioURL);
    formData.append('githubURL', githubURL);
    formData.append('linkedInURL', linkedInURL);
    formData.append('instagramURL', instagramURL);
    formData.append('twitterURL', twitterURL);
    formData.append('facebookURL', facebookURL);

    if (avatar) {
      formData.append('avatar', avatar);
    }

    if (resume) {
      formData.append('resume', resume);
    }

    dispatch(updateProfile(formData));
  };
  
  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(getUser());
      dispatch(resetProfile());
    }
    if (user) {
      setFullName(user.fullName || '');
      setEmail(user.email || '');
      setPhone(user.phone || '');
      setAboutMe(user.aboutMe || '');
      setPortfolioURL(user.portfolioURL || '');
      setGithubURL(user.githubURL || '');
      setLinkedInURL(user.linkedInURL || '');
      setInstagramURL(user.instagramURL || '');
      setTwitterURL(user.twitterURL || '');
      setFacebookURL(user.facebookURL || '');
      setAvatarPreview(user.avatar?.url || '');
      setResumePreview(user.resume?.url || '');
    }
  }, [user,  error, message, dispatch]);

  return (
    <div className="w-full h-full p-4 sm:p-6 md:p-8">
      <form onSubmit={submitHandler}>
        <div className="grid gap-4 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold">Update Profile</h1>
          <p className="text-sm sm:text-base">Update your profile information here.</p>
        </div>

        {/* Avatar and Resume Sections */}
        <div className="grid gap-6">
          <div className="flex flex-col lg:flex-row gap-5 items-center">
            {/* Profile Image */}
            <div className="flex flex-col items-center gap-2 w-full sm:w-72">
              <Label>Profile Image</Label>
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="avatar preview"
                  className="w-full h-auto sm:w-72 sm:h-72 rounded-2xl"
                />
              ) : (
                <p>No profile image selected</p>
              )}
              <input type="file" accept="image/*" onChange={avatarHandler} className="mb-2" />
            </div>

            {/* Resume */}
            <div className="flex flex-col items-center gap-2 w-full sm:w-72">
              <Label>Resume</Label>
              {resumePreview ? (
                <img
                  src={resumePreview}
                  alt="resume preview"
                  className="w-full h-auto sm:w-72 sm:h-72 rounded-2xl"
                />
              ) : (
                <p>No resume selected</p>
              )}
              <input type="file" accept=".pdf, .doc, .docx" onChange={resumeHandler} className="mb-2" />
            </div>
          </div>

          {/* Profile Information Fields */}
          {[
            { label: 'Full Name', value: fullName, setter: setFullName },
            { label: 'Email', value: email, setter: setEmail },
            { label: 'Phone', value: phone, setter: setPhone },
            { label: 'About Me', value: aboutMe, setter: setAboutMe, component: Textarea },
            { label: 'Portfolio URL', value: portfolioURL, setter: setPortfolioURL },
            { label: 'Github URL', value: githubURL, setter: setGithubURL },
            { label: 'LinkedIn URL', value: linkedInURL, setter: setLinkedInURL },
            { label: 'Instagram URL', value: instagramURL, setter: setInstagramURL },
            { label: 'Twitter(X)', value: twitterURL, setter: setTwitterURL },
            { label: 'Facebook URL', value: facebookURL, setter: setFacebookURL }
          ].map(({ label, value, setter, component: Component = Input }, index) => (
            <div key={index} className="flex flex-col gap-2">
              <Label>{label}</Label>
              <Component
                type="text"
                value={value}
                onChange={(e) => setter(e.target.value)}
                className="w-full"
              />
            </div>
          ))}
        </div>

        {/* Update Button */}
        <div className="mt-6 flex justify-center">
          {!loading ? (
            <Button type="submit" className="w-full">Update Profile</Button>
          ) : (
            <SpacialLoadingButton content={"Updating"} />
          )}
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
