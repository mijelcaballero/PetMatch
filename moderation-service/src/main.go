package main

import (
	"net/http"
	"os"
	"strings"

	"github.com/gin-gonic/gin"
)

type ModerationRequest struct {
	Content string `json:"content" binding:"required"`
}

type ModerationResponse struct {
	Flagged bool     `json:"flagged"`
	Reasons []string `json:"reasons"`
}

func moderateText(content string) (bool, []string) {
	banned := []string{"spam", "scam", "badword"}
	var reasons []string
	lower := strings.ToLower(content)
	for _, word := range banned {
		if strings.Contains(lower, word) {
			reasons = append(reasons, word)
		}
	}
	return len(reasons) > 0, reasons
}

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "3016"
	}

	router := gin.Default()

	router.POST("/api/moderate/text", func(c *gin.Context) {
		var req ModerationRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Content is required"})
			return
		}
		flagged, reasons := moderateText(req.Content)
		res := ModerationResponse{Flagged: flagged, Reasons: reasons}
		c.JSON(http.StatusOK, res)
	})

	router.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "OK", "service": "moderation-service"})
	})

	router.Run("0.0.0.0:" + port)
}
