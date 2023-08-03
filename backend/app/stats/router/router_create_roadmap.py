from fastapi import Depends, HTTPException, status
from app.utils import AppModel
from . import router
from ..service import Service, get_service
from ..adapters.jwt_service import JWTData
from .dependencies import parse_jwt_user_data


class CreateRoadmapRequest(AppModel):
    university_name: str


@router.post("/roadmap", status_code=status.HTTP_200_OK)
def create_roadmap(
    data: CreateRoadmapRequest,
    jwt_data: JWTData = Depends(parse_jwt_user_data),
    svc: Service = Depends(get_service),
):
    stats = svc.repository.get_stats(jwt_data.user_id)
    oldstats = svc.repository.getOldStats(jwt_data.user_id)
    if stats is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No stats found for this user.",
        )
    curr = svc.repository.get_roadmap(jwt_data.user_id, data.university_name)
    if curr is not None and oldstats == stats:
        return curr
    roadmap = svc.ai_svc.generate_roadmap(data.university_name, stats)
    roadmap_json = svc.ai_svc.generate_roadmap_json(roadmap)
    svc.repository.create_roadmap(jwt_data.user_id, data.university_name, roadmap_json)
    return roadmap_json
