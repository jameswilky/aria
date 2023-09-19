FROM ubuntu:latest

# Update the OS
RUN apt-get update && apt-get upgrade -y

# Install OS dependencies
RUN apt-get install -y curl gnupg wget git bash 

# ======= SQLite Setup =========
RUN apt-get update && apt-get install -y sqlite3 libsqlite3-dev


# ======= Node Setup =========
# Install nodejs
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash && apt-get install -y nodejs

# Install node dependencies
RUN npm install -g pnpm
RUN pnpm dlx playwright install
RUN pnpm dlx playwright install-deps


# ======= .NET Setup ========
# Update package sources for dotnet packages
RUN echo "Package: dotnet* aspnet* netstandard*" > /etc/apt/preferences.d/my-pin-prefs && \
    echo 'Pin: origin "packages.microsoft.com"' >> /etc/apt/preferences.d/my-pin-prefs && \
    echo "Pin-Priority: 1001" >> /etc/apt/preferences.d/my-pin-prefs

# Get Ubuntu version and set up Microsoft repository
RUN wget https://packages.microsoft.com/config/ubuntu/22.04/packages-microsoft-prod.deb -O packages-microsoft-prod.deb 
RUN dpkg -i packages-microsoft-prod.deb 
RUN rm packages-microsoft-prod.deb

RUN apt-get update && apt-get install -y aspnetcore-runtime-7.0 dotnet-runtime-7.0 dotnet-sdk-7.0

# ========= Users =========
ARG IS_VSCODE=true
RUN if [ "$IS_VSCODE" = "false" ]; then exit 1; fi

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

