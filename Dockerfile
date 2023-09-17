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

# ======= Database Setup ===========

# Create file repository configuration for postgresql
RUN  sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list' 

# Import the repository signing key
RUN  wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add -

# Setup timezone for postgres
ENV TZ=Australia/Melbourne

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Install postgres 
RUN apt-get update && apt-get install -y postgresql-15

# ======= Server Setup =========
# Install dependencies needed to download and compile Python
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
    wget \
    build-essential \
    zlib1g-dev \
    libncurses5-dev \
    libgdbm-dev \
    libnss3-dev \
    libssl-dev \
    libreadline-dev \
    libffi-dev \
    curl \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Download and install Python 3.11
RUN wget https://www.python.org/ftp/python/3.11.5/Python-3.11.5.tgz \
    && tar -xvf Python-3.11.5.tgz \
    && cd Python-3.11.5 \
    && ./configure --enable-optimizations \
    && make altinstall

# Create a symbolic link for python3.11
RUN ln -s /usr/local/bin/python3.11 /usr/local/bin/python3
RUN ln -s /usr/local/bin/python3.11 /usr/local/bin/python

# Check the installed Python version (Optional)
RUN python --version

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

