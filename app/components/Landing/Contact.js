"use client"

import React, { useState } from 'react';
import { Send, Phone, Mail, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import axios from 'axios';
import toast, {Toaster} from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault()
    try{
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}api/contact-us`, {
        name:formData.name,
        email:formData.email,
        subject:formData.subject,
        message:formData.message,
      });
      if(response.status === 201){
        toast.success("Message Sent Successfully");
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });     
      }     
    } catch (error) {
      console.error("Failed Sending Query", error);
      toast.error("Message Could Not Be Sent");
    }    
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div id="contact" className="w-full  mx-auto px-4 py-20 bg-[#F9FAFB]">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg text-gray-600">Get in touch with us. We'd love to hear from you.</p>
      </div>

      {/* <div className="grid md:grid-cols-3 gap-8 mb-12">
        <Card>
          <CardContent className="p-6 text-center">
            <Phone className="w-8 h-8 mx-auto mb-4 text-blue-600" />
            <h3 className="font-semibold mb-2">Phone</h3>
            <p className="text-gray-600">+1 (555) 123-4567</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Mail className="w-8 h-8 mx-auto mb-4 text-blue-600" />
            <h3 className="font-semibold mb-2">Email</h3>
            <p className="text-gray-600">contact@example.com</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <MapPin className="w-8 h-8 mx-auto mb-4 text-blue-600" />
            <h3 className="font-semibold mb-2">Address</h3>
            <p className="text-gray-600">123 Business Street, Suite 100, City, State 12345</p>
          </CardContent>
        </Card>
      </div> */}

      <Card className="max-w-2xl mx-auto bg-[#FFFFFF]">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium ">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 border bg-[#F9FAFB] rounded-lg  focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border bg-[#F9FAFB] rounded-lg  focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block mb-2 text-sm font-medium">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full p-3 border bg-[#F9FAFB] rounded-lg  focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block mb-2 text-sm font-medium">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full p-3 border bg-[#F9FAFB] rounded-lg  focus:ring-blue-500 focus:border-blue-500"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2"
            >
              Send Message
              <Send className="w-4 h-4" />
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Contact;