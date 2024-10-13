import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

// TypeScript interface for Message props
interface MessageProps {
  error: boolean;
  visible: boolean;
  children: React.ReactNode;
}

// Styled components for the form and messages
const FormContainer = styled.div`
  background-color: #F5F5F5;
  padding: 40px;
  max-width: 675px;
  margin: 20px auto;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
`;

const InputField = styled.input`
  width: 100%;
  padding: 15px;
  margin-bottom: 15px;
  border: 1px solid #D1D1D1;
  border-radius: 5px;
  background-color: #FFFFFF;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #5474a5;
    outline: none;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 15px;
  margin-bottom: 15px;
  border: 1px solid #D1D1D1;
  border-radius: 5px;
  background-color: #FFFFFF;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #5474a5;
    outline: none;
  }
`;

const SubmitButton = styled.button`
  background-color: #5474a5;
  color: #FFFFFF;
  padding: 15px;
  border: 1px solid #D1D1D1;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  font-size: 16px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;

  &:hover {
    background-color: #6B83B6;
    box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.2);
    border-color: #475B8A;
  }
`;

const Message = styled.p<MessageProps>`
  position: fixed;
  left: 20px;
  bottom: 20px;
  background-color: ${(props) => (props.error ? 'red' : 'green')};
  color: white;
  padding: 10px 15px;
  border-radius: 5px;
  transition: opacity 0.5s ease;
  opacity: ${(props) => (props.visible ? 1 : 0)};
`;

const ContactUsForm: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [message, setMessage] = useState({ text: '', error: false, visible: false });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Handle input change events with proper type annotations
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission with proper type annotations
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!emailRegex.test(formData.email)) {
      setMessage({ text: 'Please enter a valid email address.', error: true, visible: true });
      return;
    }
    // Handle successful form submission logic here
    setMessage({ text: 'Form submitted successfully!', error: false, visible: true });

    // Reset form data after submission
    setFormData({ name: '', email: '', message: '' });
  };

  useEffect(() => {
    if (message.visible) {
      const timer = setTimeout(() => {
        setMessage((prev) => ({ ...prev, visible: false }));
      }, 10000); // Hide after 10 seconds

      return () => clearTimeout(timer);
    }
  }, [message.visible]);

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <InputField
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
        />
        <InputField
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
        />
        <TextArea
          name="message"
          rows={5}
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
        />
        <SubmitButton type="submit">Submit</SubmitButton>
      </form>
      {/* Message display */}
      <Message error={message.error} visible={message.visible}>
        {message.text}
      </Message>
    </FormContainer>
  );
};

export default ContactUsForm;
