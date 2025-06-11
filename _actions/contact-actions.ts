"use server";

import contactData from "@/_data/general-data.json";

const {
  contactDetails: { email },
} = contactData;

export const fetchEmailAddress = async () => {
  return email;
};
