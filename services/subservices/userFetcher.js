import { ContactService } from "@/services/contact-service";

export const fetchUsers = async () => {
  return ContactService .getViewContact();
}