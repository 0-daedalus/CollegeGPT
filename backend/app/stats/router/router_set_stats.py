from fastapi import Depends, HTTPException, status
from app.utils import AppModel
from typing import Optional, List
from . import router
from ..service import Service, get_service
from ..adapters.jwt_service import JWTData
from .dependencies import parse_jwt_user_data


class SetStatsRequest(AppModel):
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


@router.patch("/user_stats", status_code=status.HTTP_200_OK)
def set_stats(
    input: SetStatsRequest,
    svc: Service = Depends(get_service),
    jwt_data: JWTData = Depends(parse_jwt_user_data),
):
    if not isinstance(input.country, str):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Country must be a string.",
        )
    if not isinstance(input.majors, str):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Major must be a string.",
        )
    if input.sat_score < 800 or input.sat_score > 1600:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="SAT score must be between 800 and 1600.",
        )
    if input.ielts_score < 0 or input.ielts_score > 9:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="IELTS score must be between 0 and 9.",
        )
    if not isinstance(input.GPA_scale, float) or not isinstance(input.CGPA, float):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="GPA must be a float.",
        )
    svc.repository.set_stats(jwt_data.user_id, input.dict())
    return {"message": "Stats set successfully."}
