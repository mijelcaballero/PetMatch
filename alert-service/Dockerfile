FROM ruby:3.1-alpine

WORKDIR /app

# Install SQLite dependencies
RUN apk add --no-cache build-base sqlite-dev

# Copy Gemfile and install gems
COPY Gemfile Gemfile.lock ./
RUN bundle install

# Copy source code
COPY src ./src

# Set working directory
WORKDIR /app/src

EXPOSE 3015

# Run the Sinatra app
CMD ["ruby", "app.rb", "-o", "0.0.0.0", "-p", "${PORT:-3015}"]
