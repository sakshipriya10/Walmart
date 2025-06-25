 


 
 import React from "react";



const ContactForm = () => {
	return (
		<form className="lg:pt-2">
			<div className="mb-3 mt-2">
				<input
					type="text"
					placeholder="Name"
					className="min-h-10 leading-9 border-transparent   p-2 rounded-md w-full focus:outline-none focus:border placeholder:opacity-60 focus:border-purple-400"
				/>
			</div>
			<div className="mb-3 mt-2">
				<input
					type="email"
					placeholder="Email"
					className="min-h-10 leading-9 border-transparent  dark:bg-[#4E536C] p-2 rounded-md w-full focus:outline-none focus:border placeholder:opacity-60 focus:border-purple-400"
				/>
			</div>
			<div className="mb-3">
				<textarea
					rows={3}
					name="message"
					placeholder="Your Message"
					className="min-h-20 leading-9 border-transparent   dark:bg-[#4E536C] p-2 rounded-md w-full focus:outline-none focus:border placeholder:opacity-60 focus:border-purple-400"
				/>
			</div>
			<div className="text-end">
				<button
					type="submit"
					className="w-full min-h-10 bg-pink-300 border border-pink-600 text-white px-5 py-2 hover:bg-pink-400 cursor-pointer transition rounded-4xl"
				>
					Send Message
				</button>
			</div>
		</form>
	);
};

const Map = () => {
	return (
		<div
			className="absolute top-0 bottom-0 right-0 bg-gradient-to-r from-pink-100 via-blue-100 to-pink-100 bg-cover  bg-no-repeat bg-center min-h-[120px] h-full w-full lg:w-1/2 flex-none lg:flex"
			style={{
				backgroundImage:
					'url("https://cdn.easyfrontend.com/pictures/googlemap.png")',
			}}
		>
			<div className="opacity-0 md:opacity-100 absolute top-[35%] right-[30%] text-[#121315] min-w-[230px] ">
				<img
					src="https://cdn.easyfrontend.com/pictures/search1_3.png"
					alt=""
					className="w-full max-h-[150px]"
				/>
				<div className="flex items-center px-8 pt-8 pb-4 bg-gradient-to-r from-pink-100 via-blue-100 to-pink-100">
					<div>
						<img
							src="https://cdn.easyfrontend.com/pictures/logos/logo-1.png"
							alt=""
							className="max-w-[40px]"
						/>
					</div>
					<div>
						<p className="pl-3 text-sm pb-0">
							1556 Broadway <br />
							New York, NY <br />
							10120, USA
						</p>
					</div>
				</div>
				<div className="text-3xl flex justify-center items-center text-blue-600 mt-[-10px]">
  📍
</div>

			</div>
		</div>
	);
};

const ContactUs16 = () => {
	return (
		<section className="ezy__contact16 light bg-gradient-to-r from-pink-100 via-blue-100 to-pink-100  md:p-24 h-screen w-screen">
			<Map />

			<div className="container px-4 mx-auto">
				<div className="grid grid-cols-12 gap-4">
					<div className="col-span-12 lg:col-span-6 z-50">
						<div className="flex justify-center lg:justify-end">
							<div className="w-[450px] border-none rounded-3xl bg-purple-50 dark:bg-[#404156]">
								<div className="p-12 lg:p-10 xl:p-12">
									<h2 className="font-bold text-l lg:text-4xl leading-none mb-4 text-pink-500">
										How Can We Help You?
									</h2>

									<ContactForm />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};


 export default ContactUs16;