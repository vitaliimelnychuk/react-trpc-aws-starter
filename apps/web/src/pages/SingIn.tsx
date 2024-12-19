import { GoogleOauth } from '@web/components/SignIn/GoogleOauth';

export const SingInView = () => {
  return (
    <div className="flex">
      <div className="md:w-1/2 flex w-full justify-center md:justify-end">
        <div className=" p-8 md:p-16 flex flex-col justify-center items-center md:items-start">
          <GoogleOauth />
        </div>
      </div>
      <div className="hidden md:block md:w-1/2 max-h-lvh">
        <img
          src="assets/img/sing-in-background.jpeg"
          alt="Screenshot"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};
