"use client";

import {
  NotificationSettingsFormData,
  notificationSettingsSchema,
} from "@/lib/schemas";
import { useUpdateUserMutation } from "@/state/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "@clerk/nextjs";
import React from "react";
import { useForm } from "react-hook-form";
import { Header } from "./Header";
import { Form } from "./ui/form";
import { CustomFormField, FormFieldProps } from "./CustomFormField";
import { Button } from "./ui/button";

export const SharedNotificationSettings = ({
  subtitle = "Manage your notification settings",
  title = "Notification Settings",
}: SharedNotificationSettingsProps) => {
  const { user } = useUser();
  const [updateUser] = useUpdateUserMutation();

  const currentSettings =
    (user?.publicMetadata as { settings?: UserSettings })?.settings || {};

  const methods = useForm<NotificationSettingsFormData>({
    resolver: zodResolver(notificationSettingsSchema),
    defaultValues: {
      courseNotifications: currentSettings.courseNotifications || false,
      emailAlerts: currentSettings.emailAlerts || false,
      smsAlerts: currentSettings.smsAlerts || false,
      notificationFrequency: currentSettings.notificationFrequency || "daily",
    },
  });

  const onSubmit = async (data: NotificationSettingsFormData) => {
    if (!user) return;

    const updatedUser = {
      userId: user.id,
      publicMetadata: {
        ...user.publicMetadata,
        settings: {
          ...currentSettings,
          ...data,
        },
      },
    };

    try {
      await updateUser(updatedUser);
    } catch (error) {
      console.error("Failed to update user settings: ", error);
    }
  };

  if (!user) return <div>Please sign in to manage your settings.</div>;
  return (
    <div className="notification-settings">
      <Header title={title} subtitle={subtitle} />
      <Form {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="notification-settings__form"
        >
          <div className="notification-settings__fields">
            {formFields.map((field) => (
              <CustomFormField
                key={field.name}
                name={field.name}
                label={field.label}
                type={field.type}
                options={field.options}
              />
            ))}
          </div>

          <Button type="submit" className="notification-settings__submit">
            Update Settings
          </Button>
        </form>
      </Form>
    </div>
  );
};

const formFields: {
  name: string;
  label: string;
  type: FormFieldProps["type"];
  options?: FormFieldProps["options"];
}[] = [
  {
    name: "courseNotifications",
    label: "Course Notifications",
    type: "switch",
  },
  {
    name: "emailAlerts",
    label: "Email Alerts",
    type: "switch",
  },
  {
    name: "smsAlerts",
    label: "SMS Alerts",
    type: "switch",
  },
  {
    name: "notificationFrequency",
    label: "Notification Frequency",
    type: "select",
    options: [
      {
        value: "immediate",
        label: "Immediate",
      },
      {
        value: "daily",
        label: "Daily",
      },
      {
        value: "weekly",
        label: "Weekly",
      },
    ],
  },
];
