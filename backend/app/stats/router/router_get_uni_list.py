from fastapi import Depends, HTTPException, status
from app.utils import AppModel
from typing import List
from . import router
from ..service import Service, get_service
from ..adapters.jwt_service import JWTData
from .dependencies import parse_jwt_user_data


class GetUniListResponse(AppModel):
    uniList: List[dict]


@router.get(
    "/universities", status_code=status.HTTP_200_OK, response_model=GetUniListResponse
)
def get_uni_list(
    svc: Service = Depends(get_service),
    jwt_data: JWTData = Depends(parse_jwt_user_data),
):
    uniList = svc.repository.get_universities(jwt_data.user_id)
    if uniList is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No universities found for this user.",
        )
    else:
        return uniList
