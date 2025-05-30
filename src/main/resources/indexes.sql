-- Add indexes to messages table
CREATE INDEX idx_messages_sender_id ON messages (sender_id);
CREATE INDEX idx_messages_receiver_id ON messages (receiver_id);
CREATE INDEX idx_messages_sender_receiver_id ON messages (sender_id, receiver_id);

-- Add indexes to users table
CREATE INDEX idx_users_external_id ON users (external_id);
CREATE INDEX idx_users_project_id ON users (project_id);
CREATE INDEX idx_users_login ON users (login);
CREATE INDEX idx_users_external_project_id ON users (external_id, project_id);
CREATE INDEX idx_users_login_project_id ON users (login, project_id);

-- Add indexes to organizations table
CREATE INDEX idx_organizations_project_id ON organizations (project_id);

-- Add indexes to user_contacts table
CREATE INDEX idx_user_contacts_user_contact_id ON user_contacts (user_id, contact_id);
