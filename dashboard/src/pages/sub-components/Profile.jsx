


import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useSelector } from 'react-redux';

const Profile = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="w-full h-full p-4 sm:p-6 md:p-8">
      <div className="grid gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Profile</h1>
        <p className="text-sm sm:text-base">Full Profile Preview</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col  gap-4">
          <label className="text-sm sm:text-base">Profile Image</label>
          {user && user.avatar && user.avatar.url ? (
            <img
              src={user.avatar.url}
              alt="avatar"
              className="w-32 h-32 sm:w-48 sm:h-48 md:w-72 md:h-72 rounded-2xl object-cover"
            />
          ) : (
            <p>No profile image available</p>
          )}
        </div>
        <div className="flex flex-col  gap-4">
          <label className="text-sm sm:text-base">Resume</label>
          {user && user.resume && user.resume.url ? (
            <img
              src={user.resume.url}
              alt="resume"
              className="w-32 h-32 sm:w-48 sm:h-48 md:w-72 md:h-72 rounded-2xl object-cover"
            />
          ) : (
            <p>No resume available</p>
          )}
        </div>
      </div>
      <div className="grid gap-4 mt-6">
        {[
          { label: 'Full Name', value: user.fullName },
          { label: 'Email', value: user.email },
          { label: 'Phone', value: user.phone },
          { label: 'About Me', value: user.aboutMe, component: Textarea },
          { label: 'Portfolio Url', value: user.portfolioURL },
          { label: 'Github URL', value: user.githubURL },
          { label: 'LinkedIn URL', value: user.linkedInURL },
          { label: 'Instagram URL', value: user.instagramURL },
          { label: 'Twitter(X)', value: user.twitterURL },
          { label: 'Facebook URL', value: user.facebookURL }
        ].map(({ label, value, component: Component = Input }, index) => (
          <div key={index} className="flex flex-col gap-2">
            <label className="text-sm sm:text-base">{label}</label>
            <Component type="text" defaultValue={value} disabled className="w-full" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
