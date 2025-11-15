import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState(null);
  
  // Define validation schema using Yup
  const ContactSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Name is too short')
      .max(50, 'Name is too long')
      .required('Name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    subject: Yup.string()
      .min(3, 'Subject is too short')
      .max(100, 'Subject is too long')
      .required('Subject is required'),
    message: Yup.string()
      .min(10, 'Message is too short - please provide more details')
      .max(1000, 'Message is too long')
      .required('Message is required'),
  });

  // Handle form submission  
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setServerError(null);
    
    try {
      // This is a placeholder. In a real implementation, you would send the form data to a server
      // For now we'll simulate a successful submission after a short delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Reset form after successful submission
      resetForm();
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000); // Reset success message after 5 seconds
    } catch (err) {
      setServerError('Failed to send message. Please try again later.');
      console.error('Form submission error:', err);
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <section id="contact" className="py-20 bg-neo-green relative overflow-hidden">
      {/* Chaotic decorative elements */}
      <div className="absolute top-10 left-10 w-44 h-36 bg-neo-yellow border-brutal-thick border-black shadow-brutal-lg rotate-12"></div>
      <div className="absolute bottom-10 right-10 w-32 h-48 bg-neo-pink border-brutal border-black shadow-brutal -rotate-6"></div>
      <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-neo-blue border-brutal-thick border-black shadow-brutal rotate-45"></div>
      <div className="absolute bottom-1/3 left-1/3 w-36 h-20 bg-neo-purple border-brutal border-black shadow-brutal -rotate-12"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center justify-center gap-6 flex-wrap mb-6">
            <div className="brutal-btn brutal-pink px-6 py-3 rotate-3">
              LET'S BUILD
            </div>
            <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tight -rotate-1">
              Contact
            </h2>
          </div>
          <div className="h-3 w-48 bg-black mx-auto -rotate-1"></div>
        </motion.div>
        
        <p className="text-center text-xl font-bold max-w-2xl mx-auto mb-12 -rotate-1">
          Need an AI engineer who actually ships production systems?
        </p>
        
        <p className="text-center text-lg max-w-2xl mx-auto mb-8">
          I'm currently in retail management at Aldi while actively seeking AI engineering roles. 
          Available to start with standard notice period.
        </p>
        
        <p className="text-center text-xl font-bold mb-12 rotate-1">
          Let's talk:{' '}
          <a 
            href="mailto:mail@finneh.xyz" 
            className="underline hover:scale-105 inline-block transition-transform text-neo-pink"
          >
            mail@finneh.xyz
          </a>
        </p>
        
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          {/* Form - takes 2 columns */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2"
          >
            <div className="brutal-card rotate-1 hover:rotate-0 transition-all">
              <div className="p-6 md:p-8 bg-white dark:bg-base-200">
                {submitted ? (
                  <div className="bg-neo-blue border-brutal border-black shadow-brutal p-8 text-center animate-fadeIn">
                    <div className="flex flex-col items-center">
                      <div className="w-20 h-20 bg-neo-yellow border-brutal border-black flex items-center justify-center mb-4 rotate-12">
                        <span className="text-4xl font-bold">✓</span>
                      </div>
                      <h3 className="text-2xl font-bold uppercase mb-2">Message Sent!</h3>
                      <p className="text-lg font-medium">Thanks! I'll get back to you soon.</p>
                    </div>
                  </div>
                ) : (
                  <Formik
                    initialValues={{
                      name: '',
                      email: '',
                      subject: '',
                      message: ''
                    }}
                    validationSchema={ContactSchema}
                    onSubmit={handleSubmit}
                  >
                    {({ isSubmitting, touched, errors, values }) => (
                      <Form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="form-control w-full">
                            <label className="label font-bold text-lg uppercase mb-2">
                              Full Name
                            </label>
                            <Field 
                              type="text" 
                              name="name"
                              className="brutal-input w-full"
                              placeholder="Your name" 
                            />
                            <ErrorMessage 
                              name="name" 
                              component="div" 
                              className="text-red-600 dark:text-red-400 text-sm mt-2 font-bold" 
                            />
                          </div>
                          
                          <div className="form-control w-full">
                            <label className="label font-bold text-lg uppercase mb-2">
                              Email Address
                            </label>
                            <Field 
                              type="email" 
                              name="email"
                              className="brutal-input w-full"
                              placeholder="your@email.com" 
                            />
                            <ErrorMessage 
                              name="email" 
                              component="div" 
                              className="text-red-600 dark:text-red-400 text-sm mt-2 font-bold" 
                            />
                          </div>
                        </div>
                        
                        <div className="form-control w-full">
                          <label className="label font-bold text-lg uppercase mb-2">
                            Subject
                          </label>
                          <Field 
                            type="text" 
                            name="subject"
                            className="brutal-input w-full"
                            placeholder="What's this about?" 
                          />
                          <ErrorMessage 
                            name="subject" 
                            component="div" 
                            className="text-red-600 dark:text-red-400 text-sm mt-2 font-bold" 
                          />
                        </div>
                        
                        <div className="form-control w-full">
                          <label className="label font-bold text-lg uppercase mb-2">
                            Message
                          </label>
                          <Field 
                            as="textarea" 
                            name="message"
                            className="brutal-input w-full h-40 resize-none"
                            placeholder="Tell me about your project..." 
                          />
                          <ErrorMessage 
                            name="message" 
                            component="div" 
                            className="text-red-600 dark:text-red-400 text-sm mt-2 font-bold" 
                          />
                        </div>
                        
                        {serverError && (
                          <div className="bg-red-500 border-brutal border-black p-4 font-bold -rotate-1">
                            ⚠ {serverError}
                          </div>
                        )}
                        
                        <div className="flex justify-center mt-8">
                          <button 
                            type="submit" 
                            className="brutal-btn brutal-yellow px-12 py-4 text-xl rotate-2 hover:rotate-0 transition-all"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
                          </button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                )}
              </div>
            </div>
          </motion.div>

          {/* Contact cards - stacked in 1 column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="brutal-card bg-white dark:bg-base-200 -rotate-2 hover:rotate-0 transition-all">
              <div className="p-6 text-center">
                <div className="w-16 h-16 bg-neo-pink border-brutal border-black mx-auto mb-4 flex items-center justify-center rotate-6">
                  <span className="text-3xl">📧</span>
                </div>
                <h3 className="text-xl font-bold uppercase mb-2">Email</h3>
                <a 
                  href="mailto:mail@finneh.xyz" 
                  className="font-bold hover:scale-105 inline-block transition-transform"
                >
                  mail@finneh.xyz
                </a>
              </div>
            </div>
            
            <div className="brutal-card bg-white dark:bg-base-200 rotate-2 hover:rotate-0 transition-all">
              <div className="p-6 text-center">
                <div className="w-16 h-16 bg-neo-blue border-brutal border-black mx-auto mb-4 flex items-center justify-center -rotate-6">
                  <i className="bx bxl-linkedin text-3xl"></i>
                </div>
                <h3 className="text-xl font-bold uppercase mb-2">LinkedIn</h3>
                <a 
                  href="https://www.linkedin.com/in/ethancornwill/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-bold hover:scale-105 inline-block transition-transform"
                >
                  Connect
                </a>
              </div>
            </div>
            
            <div className="brutal-card bg-white dark:bg-base-200 -rotate-2 hover:rotate-0 transition-all">
              <div className="p-6 text-center">
                <div className="w-16 h-16 bg-black border-brutal border-black mx-auto mb-4 flex items-center justify-center rotate-6">
                  <i className="bx bxl-github text-3xl text-white"></i>
                </div>
                <h3 className="text-xl font-bold uppercase mb-2">GitHub</h3>
                <a 
                  href="https://github.com/finneh4249" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-bold hover:scale-105 inline-block transition-transform"
                >
                  Follow
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
