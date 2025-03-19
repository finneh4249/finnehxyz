import React, { useState } from 'react';
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
    <section id="contact" className="py-20 bg-base-200 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Get In Touch
          </span>
        </h2>
        
        <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6 rounded-full"></div>
        
        <p className="text-center text-base-content/80 max-w-2xl mx-auto mb-12">
          Have a question or want to work together? Feel free to reach out 
          using the form below or contact me directly at{' '}
          <a 
            href="mailto:mail@finneh.xyz" 
            className="text-primary hover:text-secondary transition-colors font-medium"
          >
            mail@finneh.xyz
          </a>
        </p>
        
        <div className="max-w-4xl mx-auto">
          <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 border border-base-300/30">
            <div className="card-body p-6 md:p-8">
              {submitted ? (
                <div className="bg-success/10 border border-success/30 text-success p-8 rounded-lg text-center animate-fadeIn">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mb-4">
                      <i className="bx bx-check text-4xl text-success"></i>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Message Sent Successfully!</h3>
                    <p className="max-w-md mx-auto">Thank you for reaching out! I'll get back to you as soon as possible.</p>
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
                          <label className="label font-medium text-base-content/80">
                            <span className="label-text flex items-center">
                              <i className="bx bx-user mr-2 text-primary"></i> Full Name
                            </span>
                          </label>
                          <Field 
                            type="text" 
                            name="name"
                            className={`input input-bordered w-full transition-all duration-200 focus:border-primary ${
                              touched.name && errors.name 
                                ? 'input-error' 
                                : values.name 
                                  ? 'border-primary/50' 
                                  : ''
                            }`}
                            placeholder="Your name" 
                          />
                          <ErrorMessage 
                            name="name" 
                            component="div" 
                            className="text-error text-sm mt-1 flex items-center" 
                          />
                        </div>
                        
                        <div className="form-control w-full">
                          <label className="label font-medium text-base-content/80">
                            <span className="label-text flex items-center">
                              <i className="bx bx-envelope mr-2 text-primary"></i> Email Address
                            </span>
                          </label>
                          <Field 
                            type="email" 
                            name="email"
                            className={`input input-bordered w-full transition-all duration-200 focus:border-primary ${
                              touched.email && errors.email 
                                ? 'input-error' 
                                : values.email 
                                  ? 'border-primary/50' 
                                  : ''
                            }`}
                            placeholder="Your email" 
                          />
                          <ErrorMessage 
                            name="email" 
                            component="div" 
                            className="text-error text-sm mt-1 flex items-center" 
                          />
                        </div>
                      </div>
                      
                      <div className="form-control w-full">
                        <label className="label font-medium text-base-content/80">
                          <span className="label-text flex items-center">
                            <i className="bx bx-help-circle mr-2 text-primary"></i> Subject
                          </span>
                        </label>
                        <Field 
                          type="text" 
                          name="subject"
                          className={`input input-bordered w-full transition-all duration-200 focus:border-primary ${
                            touched.subject && errors.subject 
                              ? 'input-error' 
                              : values.subject 
                                ? 'border-primary/50' 
                                : ''
                          }`}
                          placeholder="What's this regarding?" 
                        />
                        <ErrorMessage 
                          name="subject" 
                          component="div" 
                          className="text-error text-sm mt-1 flex items-center" 
                        />
                      </div>
                      
                      <div className="form-control w-full">
                        <label className="label font-medium text-base-content/80">
                          <span className="label-text flex items-center">
                            <i className="bx bx-message-detail mr-2 text-primary"></i> Message
                          </span>
                        </label>
                        <Field 
                          as="textarea" 
                          name="message"
                          className={`textarea textarea-bordered h-40 w-full transition-all duration-200 focus:border-primary ${
                            touched.message && errors.message 
                              ? 'textarea-error' 
                              : values.message 
                                ? 'border-primary/50' 
                                : ''
                          }`}
                          placeholder="Tell me about your project, question, or just say hello!" 
                        />
                        <ErrorMessage 
                          name="message" 
                          component="div" 
                          className="text-error text-sm mt-1 flex items-center" 
                        />
                      </div>
                      
                      {serverError && (
                        <div className="bg-error/10 border border-error/30 p-4 rounded-lg flex items-center">
                          <i className="bx bx-error-circle text-xl text-error mr-2"></i>
                          <p>{serverError}</p>
                        </div>
                      )}
                      
                      <div className="flex justify-center mt-4">
                        <button 
                          type="submit" 
                          className={`btn btn-primary px-10 py-3 text-base font-medium shadow-lg hover:shadow-primary/30 transition-all duration-300 ${
                            isSubmitting ? 'opacity-90' : 'hover:scale-105'
                          }`}
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <span className="flex items-center">
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Sending...
                            </span>
                          ) : (
                            <span className="flex items-center">
                              Send Message
                              <i className="bx bx-send ml-2"></i>
                            </span>
                          )}
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              )}
            </div>
          </div>
          
          {/* Enhanced Contact info cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="card bg-base-100 shadow-md hover:shadow-lg transition-all duration-300 border border-base-300/30 hover:border-primary/20 group hover:-translate-y-1">
              <div className="card-body items-center text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <i className="bx bx-envelope text-primary text-3xl"></i>
                </div>
                <h3 className="card-title text-lg">Email</h3>
                <p className="text-base-content/80 mb-2">Drop me a line</p>
                <a 
                  href="mailto:mail@finneh.xyz" 
                  className="text-primary hover:text-secondary transition-colors font-medium"
                >
                  mail@finneh.xyz
                </a>
              </div>
            </div>
            
            <div className="card bg-base-100 shadow-md hover:shadow-lg transition-all duration-300 border border-base-300/30 hover:border-secondary/20 group hover:-translate-y-1">
              <div className="card-body items-center text-center">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
                  <i className="bx bxl-linkedin text-secondary text-3xl"></i>
                </div>
                <h3 className="card-title text-lg">LinkedIn</h3>
                <p className="text-base-content/80 mb-2">Let's connect</p>
                <a 
                  href="https://www.linkedin.com/in/ethancornwill/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-secondary hover:text-primary transition-colors font-medium"
                >
                  Connect with me
                </a>
              </div>
            </div>
            
            <div className="card bg-base-100 shadow-md hover:shadow-lg transition-all duration-300 border border-base-300/30 hover:border-accent/20 group hover:-translate-y-1">
              <div className="card-body items-center text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <i className="bx bxl-github text-accent text-3xl"></i>
                </div>
                <h3 className="card-title text-lg">GitHub</h3>
                <p className="text-base-content/80 mb-2">Check out my code</p>
                <a 
                  href="https://github.com/finneh4249" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-accent hover:text-primary transition-colors font-medium"
                >
                  Follow my work
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
