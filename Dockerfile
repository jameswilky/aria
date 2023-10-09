FROM mcr.microsoft.com/devcontainers/base:bullseye AS base

# ======== OS Setup =========

# Create keyring for nodejs
RUN mkdir -p /etc/apt/keyrings
RUN curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg

# Create debian repo for nodejs
RUN echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_18.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list

# Get Ubuntu version of.NET and set up Microsoft repository
RUN wget https://packages.microsoft.com/config/debian/11/packages-microsoft-prod.deb -O packages-microsoft-prod.deb
RUN dpkg -i packages-microsoft-prod.deb 
RUN rm packages-microsoft-prod.deb

# Update the OS
RUN apt-get update && apt-get upgrade -y $$ 

# ============ Software ============

# utilities
RUN apt-get install -y curl gnupg wget git bash tree 

# sqlite
RUN apt-get install -y sqlite3 libsqlite3-dev

# node
RUN apt-get install -y nodejs
RUN npm install -g pnpm
RUN pnpm dlx playwright install
RUN pnpm dlx playwright install-deps
#RUN apt-get install -y xvfb x11vnc tigervnc-standalone-server xauth tigervnc-scraping-server xauth

# .net
RUN apt-get install -y aspnetcore-runtime-7.0 dotnet-runtime-7.0 dotnet-sdk-7.0

# ========= Buil agent =======
FROM base as build_agent

# Create a new user
RUN useradd agent

# Switch to the new user
USER agent


# ======= Dev Container ===
FROM base as dev_container

ARG USERNAME=vscode

# Used to persist bash history as per https://code.visualstudio.com/remote/advancedcontainers/persist-bash-history
RUN SNIPPET="export PROMPT_COMMAND='history -a' && export HISTFILE=/commandhistory/.bash_history" \
    && mkdir /commandhistory \
    && touch /commandhistory/.bash_history \
    && chown -R $USERNAME /commandhistory \
    && echo "$SNIPPET" >> "/home/$USERNAME/.bashrc"