using Grpc.Core;
using MailKit.Net.Smtp;
using MimeKit;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using System;

namespace EmailService.Services;

// EmailService.cs  
public class EmailSenderService : Email.EmailBase
{
    private readonly IConfiguration _config;
    private readonly ILogger<EmailSenderService> _logger;
    public EmailSenderService(IConfiguration config, ILogger<EmailSenderService> logger)
    {
        _config = config;
        _logger = logger;
    }
    public override Task<EmailReply> Send(EmailRequest request, ServerCallContext context)
    {
        try
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress(
                _config["EMAIL_FROM_NAME"] ?? "no-reply",
                _config["EMAIL_FROM"] ?? "no-reply@example.com"));
            message.To.Add(MailboxAddress.Parse(request.To));
            message.Subject = request.Subject;
            message.Body = new TextPart("plain") { Text = request.Body };

            using var client = new SmtpClient();
            var host = _config["SMTP_HOST"] ?? "localhost";
            var port = int.Parse(_config["SMTP_PORT"] ?? "25");
            client.Connect(host, port, false);

            var user = _config["SMTP_USER"];
            var pass = _config["SMTP_PASSWORD"];
            if (!string.IsNullOrEmpty(user))
                client.Authenticate(user, pass);

            client.Send(message);
            client.Disconnect(true);

            return Task.FromResult(new EmailReply { Success = true, Message = "Email sent" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error sending email");
            return Task.FromResult(new EmailReply { Success = false, Message = ex.Message });
        }
    }
}
