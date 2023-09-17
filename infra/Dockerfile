FROM ubuntu:latest

# Update the OS
RUN apt-get update && apt-get upgrade -y

# Install OS dependencies
RUN apt-get install -y curl gnupg wget git

# ======= Node Setup =========
# Install nodejs
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash && apt-get install -y nodejs

# Install node dependencies
RUN npm install -g pnpm
RUN npx playwright install

# ====== .NET Setup =======
COPY dotnet_setup.sh /tmp/devcontainer/dotnet_setup.sh
RUN /bin/bash //tmp/devcontainer/dotnet_setup.sh

# ========= Users =========
# Setup VSCode user. This is to ensure you dont run into any file conflicts with the vscode mount and the container
ARG USERNAME=vscode
ARG USER_UID=1000
ARG USER_GID=$USER_UID

# Create the user
RUN groupadd --gid $USER_GID $USERNAME \
    && useradd --uid $USER_UID --gid $USER_GID -m $USERNAME \
    # Add sudo permissions
    && apt-get update \
    && apt-get install -y sudo \
    && echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME
    
# [Optional] Set the default user. Omit if you want to keep the default as root.
USER $USERNAME

