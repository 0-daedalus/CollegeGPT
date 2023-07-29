from fastapi import Depends, HTTPException, status
from app.utils import AppModel
from typing import List
from . import router
from ..service import Service, get_service
from ..adapters.jwt_service import JWTData
from .dependencies import parse_jwt_user_data


class GetUniversityRequest(AppModel):
    university_name: str


class GetUniversityResponse(AppModel):
    name: str
    type: str
    description: str
    tips: str
    imageUrl: str


@router.get(
    "/universities/{name}",
    status_code=status.HTTP_200_OK,
    response_model=GetUniversityResponse,
)
def get_university(
    name: str,
    svc: Service = Depends(get_service),
    jwt_data: JWTData = Depends(parse_jwt_user_data),
):
    uni = svc.repository.get_university(jwt_data.user_id, name)
    if uni is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No university found with this name.",
        )
    else:
        return uni
