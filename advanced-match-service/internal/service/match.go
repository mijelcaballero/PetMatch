package service

import (
	"context"
	"time"

	pb "github.com/erikkase/petmatch/advanced-match-service/proto"
)

type MatchService struct {
	pb.UnimplementedAdvancedMatchServer
}

func (s *MatchService) GetAdvancedMatches(req *pb.MatchRequest, stream pb.AdvancedMatch_GetAdvancedMatchesServer) error {
	// stub: normaliza user_id, genera 5 resultados ficticios
	for i := 1; i <= 5; i++ {
		result := &pb.MatchResult{
			MatchId: req.UserId + "_adv_" + string(i),
			Score:   1.0 / float64(i),
			Factors: []string{"location", "breed", "activity"},
		}
		if err := stream.Send(result); err != nil {
			return err
		}
		time.Sleep(200 * time.Millisecond)
	}
	return nil
}
func (s *MatchService) GetAdvancedMatchDetails(ctx context.Context, req *pb.MatchDetailRequest) (*pb.MatchDetailResponse, error) {
	// stub: devuelve detalles ficticios basados en match_id
	return &pb.MatchDetailResponse{
		MatchId: req.MatchId,
		Details: "Detalles avanzados para " + req.MatchId,
		Factors: []string{"location", "breed", "activity"},
	}, nil
}
