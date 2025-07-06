//      }
using System;
using EmailService.Services;

using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Http; // Add this for Results


var builder = WebApplication.CreateBuilder(args);
builder.Services.AddGrpc();
var app = builder.Build();

var port = Environment.GetEnvironmentVariable("PORT") ?? "3018";
app.Urls.Add($"http://0.0.0.0:{port}");

// Ensure that EmailSenderService exists in EmailService.Services namespace
app.MapGrpcService<EmailService.Services.EmailSenderService>();
app.MapGet("/health", () => Results.Json(new { status = "OK", service = "email-service" }));
app.Run();
