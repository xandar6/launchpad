import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button"; // Re-added Button import
import { Input } from "@/components/ui/input";
// Though FormLabel is used, Label might be needed if we customize
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Removed Hero.module.css and framer-motion imports
// Removed contactBg import
const formSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  projectType: z.string().min(1, { message: "Please select a project type." }),
  budgetRange: z.string().optional(),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." }),
  file: z.any().optional(), // Basic file validation can be more complex; for now, just making it optional
});

type ContactFormValues = z.infer<typeof formSchema>;

const Contact: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      projectType: "",
      budgetRange: "",
      message: "",
      file: undefined,
    },
  });

  function onSubmit(values: ContactFormValues) {
    console.log("Form Submitted:", values);
    // Here you would typically send the data to a backend or email service
    setIsSubmitted(true);
    // Optionally reset form: form.reset();
  }

  return (
    <section id="contact" className="bg-[var(--launchpad-navy)] relative py-40">
      {/* Removed background image and overlay div */}
      {/* Added py-40 */}
      {/* Dark overlay removed */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Removed py classes */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 xl:gap-16 items-center">
          {" "}
          {/* Changed items-start to items-center */}
          {/* Left Column: Text Content */}
          <div className="text-center lg:text-left mb-12 lg:mb-0">
            {" "}
            {/* Reverted lg:text-center to lg:text-left */}{" "}
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-20 text-center font-[var(--launchpad-poppins-font)]">
              Let’s Talk About Your Project
            </h2>
            <p className="text-base sm:text-lg text-gray-300 mb-8 sm:mb-10 max-w-lg mx-auto lg:mx-0 font-[var(--launchpad-poppins-font)]">
              Not sure where to start? Just tell us what you’re looking for —
              we’ll help you figure out the rest.
            </p>
            {/* Additional Contact Info */}
            <div className="text-gray-300">
              <p className="text-xl font-semibold mb-3 font-[var(--launchpad-poppins-font)]">
                Or reach us directly:
              </p>
              <p className="text-base sm:text-lg font-[var(--launchpad-poppins-font)]">
                Email:{" "}
                <a
                  href="mailto:hello@launchpadwebsolutions.com"
                  className="text-[--launchpad-blue] hover:underline hover:text-[--launchpad-blue-hover] transition-colors duration-200">
                  hello@launchpadwebsolutions.com
                </a>
              </p>
              {/* 
                <p className="mt-2 text-base sm:text-lg">Phone: <a href="tel:+1234567890" className="text-[--launchpad-blue] hover:underline hover:text-[--launchpad-blue-hover] transition-colors duration-200">+1 (234) 567-890</a></p>
                <div className="mt-4 flex justify-center lg:justify-start space-x-4">
                  <a href="#" className="text-gray-400 hover:text-[--launchpad-blue] transition-colors duration-200"> LinkedIn Icon </a>
                  <a href="#" className="text-gray-400 hover:text-[--launchpad-blue] transition-colors duration-200"> GitHub Icon </a>
                </div>
              */}
            </div>
          </div>
          {/* Right Column: Form */}
          <div className="w-full">
            {isSubmitted ? (
              <div className="bg-[--launchpad-navy-overlay] backdrop-blur-sm p-6 sm:p-8 rounded-lg shadow-xl max-w-xl mx-auto lg:mx-0 lg:max-w-none">
                <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-4 font-poppins">
                  Thank You!
                </h3>
                <p className="text-gray-300 text-base sm:text-lg">
                  Your message has been sent successfully. We'll get back to you
                  soon.
                </p>
              </div>
            ) : (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6 sm:space-y-8 max-w-xl md:max-w-3xl mx-auto lg:mx-0 lg:max-w-none bg-[--launchpad-navy-overlay] backdrop-blur-sm p-6 sm:p-8 rounded-lg shadow-xl border border-gray-600">
                  <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-6 gap-y-6 sm:gap-y-8">
                    {/* Full Name */}
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-200 text-left block mb-1">
                            Full Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="John Doe"
                              {...field}
                              className="bg-white/10 border-gray-600 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-offset-0 focus:ring-[--launchpad-blue] w-full"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Email Address */}
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-200 text-left block mb-1">
                            Email Address
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="you@example.com"
                              {...field}
                              className="bg-white/10 border-gray-600 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-offset-0 focus:ring-[--launchpad-blue] w-full"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Project Type (Select) */}
                    <FormField
                      control={form.control}
                      name="projectType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-200 text-left block mb-1">
                            Project Type
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-white/10 border-gray-600 text-white data-[placeholder]:text-gray-400 focus:ring-2 focus:ring-offset-0 focus:ring-[--launchpad-blue] w-full text-left">
                                <SelectValue placeholder="Select a project type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-slate-900 text-white border-gray-700">
                              <SelectItem value="basic-website">
                                Basic Website
                              </SelectItem>
                              <SelectItem value="multi-page-website">
                                Multi-Page Website
                              </SelectItem>
                              <SelectItem value="dynamic-website">
                                Dynamic Website
                              </SelectItem>
                              <SelectItem value="web-app">Web App</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Budget Range (Select - Optional) */}
                    <FormField
                      control={form.control}
                      name="budgetRange"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-200 text-left block mb-1">
                            Budget Range (Optional)
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-white/10 border-gray-600 text-white data-[placeholder]:text-gray-400 focus:ring-2 focus:ring-offset-0 focus:ring-[--launchpad-blue] w-full text-left">
                                <SelectValue placeholder="Select a budget range" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-slate-900 text-white border-gray-700">
                              <SelectItem value="under-500">
                                Under $500
                              </SelectItem>
                              <SelectItem value="500-1000">
                                $500 - $1000
                              </SelectItem>
                              <SelectItem value="1000-2000">
                                $1000 - $2000
                              </SelectItem>
                              <SelectItem value="2000+">$2000+</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  {/* Message (Textarea) */}
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-200 text-left block mb-1">
                          Message
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us about your project, your goals, or any questions you have..."
                            {...field}
                            className="bg-white/10 border-gray-600 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-offset-0 focus:ring-[--launchpad-blue] w-full min-h-[120px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Optional File Upload */}
                  <FormField
                    control={form.control}
                    name="file"
                    render={(
                      { field: { onChange, ...restField } } // Destructure to handle file input correctly
                    ) => (
                      <FormItem>
                        <FormLabel className="text-gray-200 text-left block mb-1">
                          Attach Sketch / Brief (Optional)
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            onChange={(e) =>
                              onChange(
                                e.target.files ? e.target.files[0] : null
                              )
                            }
                            {...restField}
                            className="h-10 px-3 leading-loose bg-white/10 border-gray-600 text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[--launchpad-blue] file:text-white hover:file:bg-[--launchpad-blue-hover] focus:ring-2 focus:ring-offset-0 focus:ring-[--launchpad-blue] w-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-[var(--launchpad-white)] text-[var(--launchpad-navy)] hover:bg-neutral-200 font-semibold py-3 text-lg transition-colors duration-200"
                    disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting
                      ? "Sending..."
                      : "Send Message"}
                  </Button>
                </form>
              </Form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
