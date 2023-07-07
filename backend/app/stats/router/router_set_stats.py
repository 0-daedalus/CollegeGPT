from fastapi import Depends, HTTPException, status
from app.utils import AppModel
from typing import Optional, List
from . import router
from ..service import Service, get_service
from ..adapters.jwt_service import JWTData
from .dependencies import parse_jwt_user_data


class SetStatsRequest(AppModel):
    country: Optional[str]
    majors: Optional[List[str]]
    sat_score: Optional[int]
    ielts_score: Optional[float]
    GPA_scale: Optional[float]
    CGPA: Optional[float]
    fin_aid: Optional[bool]
    school: Optional[str]
    interests: Optional[List[str]]
    olympiads: Optional[List[str]]
    projects: Optional[List[str]]
    volunteering: Optional[str]


@router.patch("/{user_id}", status_code=status.HTTP_200_OK)
def set_stats(
    input: SetStatsRequest,
    svc: Service = Depends(get_service),
    jwt_data: JWTData = Depends(parse_jwt_user_data),
):
    svc.repository.set_stats(jwt_data.user_id, input.dict())
    return {"message": "Stats set successfully."}
