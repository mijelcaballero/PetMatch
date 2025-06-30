package main

import (
	"log"
	"net"

	"github.com/erikkase/petmatch/advanced-match-service/internal/service"
	pb "github.com/erikkase/petmatch/advanced-match-service/proto"
	"google.golang.org/grpc"
)

func main() {
	lis, err := net.Listen("tcp", ":3008")
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	s := grpc.NewServer()
	pb.RegisterAdvancedMatchServer(s, &service.MatchService{})

	log.Println("advanced-match-service listening on :3008")
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
