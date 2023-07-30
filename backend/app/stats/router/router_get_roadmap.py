from fastapi import Depends, HTTPException, status
from app.utils import AppModel
from typing import List
from . import router
from ..service import Service, get_service
from ..adapters.jwt_service import JWTData
from .dependencies import parse_jwt_user_data


class GetRoadmapResponse(AppModel):
    roadmap: dict


@router.get("/roadmap", status_code=status.HTTP_200_OK)
def get_roadmap(
    name: str,
    svc: Service = Depends(get_service),
    jwt_data: JWTData = Depends(parse_jwt_user_data),
):
    roadmap = svc.repository.get_roadmap(jwt_data.user_id, name)
    if roadmap is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No roadmap found for this user.",
        )
    else:
        return roadmap
