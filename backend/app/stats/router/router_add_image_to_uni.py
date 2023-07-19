from fastapi import Depends, HTTPException, status
from app.utils import AppModel
from typing import Optional, List
from . import router
from ..service import Service, get_service
from ..adapters.jwt_service import JWTData
from .dependencies import parse_jwt_user_data


@router.patch("/universities", status_code=status.HTTP_200_OK)
def add_image_to_uni_list(
    name: str,
    imageUrl: str,
    jwt_data: JWTData = Depends(parse_jwt_user_data),
    svc: Service = Depends(get_service),
):
    svc.repository.addImageToUni(jwt_data.user_id, name, imageUrl)
    return {"message": "Image added successfully."}
