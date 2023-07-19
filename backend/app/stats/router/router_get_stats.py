from fastapi import Depends, HTTPException, status
from app.utils import AppModel
from typing import Optional, List
from . import router
from ..service import Service, get_service
from ..adapters.jwt_service import JWTData
from .dependencies import parse_jwt_user_data


class GetStatsResponse(AppModel):
    country: Optional[str]
    majors: Optional[str]
    sat_score: Optional[int]
    ielts_score: Optional[float]
    GPA_scale: Optional[float]
    CGPA: Optional[float]
    # fin_aid: Optional[bool]
    # school: Optional[str]
    # interests: Optional[str]
    # olympiads: Optional[str]
    # projects: Optional[str]
    # volunteering: Optional[str]


@router.get(
    "/{user_id}", status_code=status.HTTP_200_OK, response_model=GetStatsResponse
)
def get_stats(
    svc: Service = Depends(get_service),
    jwt_data: JWTData = Depends(parse_jwt_user_data),
):
    entry = svc.repository.get_stats(jwt_data.user_id)
    if entry is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No stats found for this user.",
        )
    else:
        return entry
