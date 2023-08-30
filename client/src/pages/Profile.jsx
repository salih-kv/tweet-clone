import { Button } from "../components/Button.jsx";
import { Input } from "../components/Input.jsx";

const Profile = () => {
  return (
    <div className="dark:bg-[#151C24] dark:text-gray-500 w-full min-h-screen flex justify-between">
      <div className="bg-[#212B35] w-[500px] h-screen hidden lg:block"></div>
      <div className="w-full mt-16 pl-32 flex flex-col gap-12">
        <article>
          <h1 className="font-bold text-xl mb-2 dark:text-white">
            Account Settings
          </h1>
          <p className="text-sm">Change your profile and account settings</p>
        </article>
        <div className="flex items-center mb-4">
          <img
            className="rounded-full mr-8"
            src="https://placehold.co/100x100.png"
            alt="profile-image"
          />
          <div className="flex flex-col gap-4">
            <Button variant="fill">Change picture</Button>
            <Button variant="outlined">Delete picture</Button>
          </div>
        </div>
        <div className="flex flex-col gap-3 text-md font-medium max-w-lg">
          <div className="flex gap-4">
            <div>
              <label htmlFor="fname">First name</label>
              <Input id="fname" />
            </div>
            <div>
              <label htmlFor="lname">Last name</label>
              <Input id="lname" />
            </div>
          </div>
          <div>
            <label htmlFor="username">Username</label>
            <Input id="username" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <Input id="password" />
          </div>
        </div>
        <div className="flex gap-4">
          <Button variant="fill">Update</Button>
          <Button variant="outlined">Cancel</Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
