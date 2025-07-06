require 'sinatra'
require 'sequel'
require 'json'
require 'net/http'
require 'uri'
require 'dotenv/load'

DB_FILE = ENV['DB_FILE'] || './subscriptions.db'
DB = Sequel.connect("sqlite://\#{DB_FILE}}")
# Create subscriptions table if not exists
DB.create_table? :subscriptions do
  primary_key :id
  String :callback_url, null: false
  DateTime :created_at, default: Sequel::CURRENT_TIMESTAMP
end

subscriptions = DB[:subscriptions]

before do
  content_type :json
end

# Health check
get '/health' do
  { status: 'OK', service: 'alert-service' }.to_json
end

# Subscribe to events via webhook
post '/api/subscribe' do
  begin
    payload = JSON.parse(request.body.read)
    url = payload['callback_url']
    halt 400, { error: 'callback_url required' }.to_json unless url
    subscriptions.insert(callback_url: url)
    status 201
    { message: 'Subscribed', callback_url: url }.to_json
  rescue JSON::ParserError
    halt 400, { error: 'Invalid JSON' }.to_json
  end
end

# Receive event and forward to subscribers
post '/api/events' do
  begin
    event = JSON.parse(request.body.read)
    delivered = 0
    subscriptions.all.each do |sub|
      uri = URI(sub[:callback_url])
      http = Net::HTTP.new(uri.host, uri.port)
      req = Net::HTTP::Post.new(uri, 'Content-Type' => 'application/json')
      req.body = event.to_json
      begin
        http.request(req)
        delivered += 1
      rescue
        # ignore failures per subscriber
      end
    end
    { message: 'Event forwarded', delivered: delivered }.to_json
  rescue JSON::ParserError
    halt 400, { error: 'Invalid JSON' }.to_json
  end
end
