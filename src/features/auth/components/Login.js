// import { useSelector, useDispatch } from 'react-redux';
// import { selectError, selectLoggedInUser } from '../authSlice';
// import { Link, Navigate } from 'react-router-dom';
// import { loginUserAsync } from '../authSlice';
// import { useForm } from 'react-hook-form';

// export default function Login() {
//   const dispatch = useDispatch();
//   const error = useSelector(selectError);
//   const user = useSelector(selectLoggedInUser);
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   return (
//     <>
//       {user && <Navigate to="/" replace={true}></Navigate>}
//       <div className="flex min-h-screen justify-center items-center bg-gray-100">
//         <div className="max-w-md w-full mx-auto bg-white rounded-lg shadow-md overflow-hidden">
//           <div className="p-8">
//             <img
//               className="mx-auto h-24 w-24"
//               src="/mashcraft_logo_round.png"
//               alt="Your Company"
//             />
//             <h2 className="mt-6 text-center text-2xl font-bold leading-9 text-gray-900">
//               Log in to your account
//             </h2>
//           </div>

//           <form
//             onSubmit={handleSubmit((data) => {
//               dispatch(
//                 loginUserAsync({ email: data.email, password: data.password })
//               );
//             })}
//             className="p-8"
//           >
//             <div className="space-y-4">
//               <div>
//                 <label
//                   htmlFor="email"
//                   className="block text-sm font-medium leading-6 text-gray-900"
//                 >
//                   Email address
//                 </label>
//                 <div className="mt-1">
//                   <input
//                     id="email"
//                     {...register('email', {
//                       required: 'Email is required',
//                       pattern: {
//                         value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
//                         message: 'Email not valid',
//                       },
//                     })}
//                     type="email"
//                     className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                   />
//                   {errors.email && (
//                     <p className="mt-1 text-xs text-red-500">
//                       {errors.email.message}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               <div>
//                 <label
//                   htmlFor="password"
//                   className="block text-sm font-medium leading-6 text-gray-900"
//                 >
//                   Password
//                 </label>
//                 <div className="mt-1">
//                   <input
//                     id="password"
//                     {...register('password', {
//                       required: 'Password is required',
//                     })}
//                     type="password"
//                     className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                   />
//                   {errors.password && (
//                     <p className="mt-1 text-xs text-red-500">
//                       {errors.password.message}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               {error && (
//                 <p className="mt-1 text-xs text-red-500">{error.message}</p>
//               )}

//               <div>
//                 <button
//                   type="submit"
//                   className="w-full py-2 px-4 border border-transparent text-sm font-semibold rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                 >
//                   Log in
//                 </button>
//               </div>
//             </div>
//           </form>

//           <div className="p-8">
//             <p className="text-center text-sm text-gray-500">
//               Not a member?{' '}
//               <Link
//                 to="/signup"
//                 className="font-semibold text-indigo-600 hover:text-indigo-500"
//               >
//                 Create an Account
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
import { useSelector, useDispatch } from 'react-redux';
import { selectError, selectLoggedInUser } from '../authSlice';
import { Link, Navigate } from 'react-router-dom';
import { loginUserAsync } from '../authSlice';
import { useForm } from 'react-hook-form';

export default function Login() {
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const user = useSelector(selectLoggedInUser);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      {user && <Navigate to="/" replace={true}></Navigate>}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-20 w-auto"
            src="/mashcraft_logo_round.png"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Log in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            noValidate
            onSubmit={handleSubmit((data) => {
              dispatch(loginUserAsync({ email: data.email, password: data.password }));
            })}
            className="space-y-6"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                      message: 'Email not valid',
                    },
                  })}
                  type="email"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <Link
                    to="/forgot-password"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  {...register('password', {
                    required: 'Password is required',
                  })}
                  type="password"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>
              {error && <p className="text-red-500">{error}</p>}
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Log in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <Link
              to="/signup"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Create an Account
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
