import { useState } from 'react'
import './App.css'

// import the react hook form
import { useForm } from "react-hook-form";

function App() {
	const [count, setCount] = useState(0)

	// create a form object using the useform hook
	const {
		register,
		handleSubmit,
		// for custom error, use setErrors function
		setError,
		formState: { errors }
	} = useForm();

	// on submit logg the data to console
	const onSubmit = async (data) => {
		// to send data to be server, we have to create request and request body, with POST or PUT methods

		// hit a post request on localhost 3000, at that end point our express app will read the data we have send to it

		try {

			// process the data
			const processedData = {
				...data,
				age: parseInt(data.age, 10),
				score12th: parseInt(data.score12th, 10),
				score10th: parseInt(data.score10th, 10),
			}

			const url = 'http://localhost:3000/'

			// to make a POST request, to send data to be server on the given url
			const res = await fetch(url, {
				method: 'POST',
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(processedData)
			})

			// if any error in the response
			if (!res.ok) {
				const errText = await res.text()
				throw new Error(errText)
			}

			// to log the response to console, first convert it to text and then log it to console
			const response = await res.text()

			// hit an alert and log the data
			alert('Form Submitted Successfully!')
			console.log(processedData, response)
		} catch (error) {
			console.log('Error Submitting the form', error);
		}
	};

	return (
		<>
			{/* heading */}
			<div className="heading text-gray-400 font-serif">
				<h1>Welcome to UniSus</h1>
				<h1>University of Freedom, learn Anything you want</h1>
			</div>

			{/* the form container div */}
			<div className="mt-11 container py-3 rounded-lg shadow-2xl text-gray-400 font-serif bg-stone-900">
				{/* handle submit will validate the inputs before invoking onSubmit() */}
				<form action="" className="admission text-lg" onSubmit={handleSubmit(onSubmit)}>

					{/* entries in a form */}
					<div className='mt-5 mb-5'>
						<label htmlFor="name">Enter Full Name</label><br />
						{/* register your input into the hook by using the register function */}
						<input placeholder='Name' type="text" name="name" id="" {...register('name',
							{ required: { value: true, message: 'Please Enter your Full Name' } })
						} />

						{/* if there are any errors display them */}
						{errors.name && <div className="text-red-500">{errors.name.message}</div>}
					</div>

					<div className='mt-5 mb-5'>
						<label htmlFor="name">Enter your Age</label><br />
						{/* register your input into the hook by using the register function */}
						<input placeholder='Age' type="number" name="age" id="" {...register('age',
							{
								required: { value: true, message: 'Please Enter a valid Age' },
								min: { value: 18, message: 'You should be atleast 18 years old' },
								max: { value: 26, message: 'You should be atmost 26 years old' }
							})
						} />

						{/* if there are any errors display them */}
						{errors.age && <div className="text-red-500">{errors.age.message}</div>}
					</div>

					<div className='mt-5 mb-5'>
						<label htmlFor="gender">Select your Gender</label><br />
						{/* register your input into the hook by using the register function */}
						<select {...register("gender",
							{
								required: { value: true, message: 'Please Select your Gender' }
							}
						)}>
							<option value="">Select Gender</option> {/* Placeholder option */}
							<option value="female">Female</option>
							<option value="male">Male</option>
							<option value="other">Non-Binary</option>
						</select>

						{/* if there are any errors display them */}
						{errors.gender && <div className="text-red-500">{errors.gender.message}</div>}
					</div>

					<div className='mt-5 mb-5'>
						<label htmlFor="name">Enter your Full Address</label><br />
						{/* register your input into the hook by using the register function */}
						<input placeholder='Address' type="text" name="address" id="" {...register('address',
							{
								required: { value: true, message: 'Please Enter a valid Address' },
								minLength: { value: 5, message: 'Minimum Length is 5 characters' },
								maxLength: { value: 30, message: 'Maximum Length is 30 characters' }
							})
						} />

						{/* if there are any errors display them */}
						{errors.address && <div className="text-red-500">{errors.address.message}</div>}
					</div>

					<div className='mt-5 mb-5'>
						<label htmlFor="name">Class 12 Score</label><br />
						{/* register your input into the hook by using the register function */}
						<input placeholder='Class 12 Score' type="text" name="score12th" id="" {...register('score12th',
							{
								required: { value: true, message: 'Please Enter a valid 12th Score' },
								min: { value: 0, message: 'Minimum score can be 00' },
								max: { value: 100, message: 'Maximum score can be 100' }
							})
						} />

						{/* if there are any errors display them */}
						{errors.score12th && <div className="text-red-500">{errors.score12th.message}</div>}
					</div>

					<div className='mt-5 mb-5'>
						<label htmlFor="name">Class 10 Score</label><br />
						{/* register your input into the hook by using the register function */}
						<input placeholder='Class 10 Score' type="text" name="score10th" id="" {...register('score10th',
							{
								required: { value: true, message: 'Please Enter a valid 12th Score' },
								min: { value: 0, message: 'Minimum score can be 00' },
								max: { value: 100, message: 'Maximum score can be 100' }
							})
						} />

						{/* if there are any errors display them */}
						{errors.score10th && <div className="text-red-500">{errors.score10th.message}</div>}
					</div>

					<div className='mt-5 mb-5'>
						<label htmlFor="name">Department</label><br />
						{/* register your input into the hook by using the register function */}
						<input placeholder='Your Department' type="text" name="dept" id="" {...register('dept',
							{
								required: { value: true, message: 'Please Enter a your Department Name' },
								minLength: { value: 2, message: 'Minimum Length is 2 characters' },
								maxLength: { value: 30, message: 'Maximum Length is 30 characters' }
							})
						} />

						{/* if there are any errors display them */}
						{errors.dept && <div className="text-red-500">{errors.dept.message}</div>}
					</div>

					<input type="submit" value="Submit" className='bg-black cursor-pointer' />
				</form>
			</div>
		</>
	)
}

export default App
