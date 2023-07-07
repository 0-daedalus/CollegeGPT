from fastapi import Depends, HTTPException, status
from app.utils import AppModel
from typing import Optional, List
from . import router
from ..service import Service, get_service
from ..adapters.jwt_service import JWTData
from .dependencies import parse_jwt_user_data


@router.post("/universities/{user_id}", status_code=status.HTTP_200_OK)
def create_uni_list(
    jwt_data: JWTData = Depends(parse_jwt_user_data),
    svc: Service = Depends(get_service),
):
    stats = svc.repository.get_stats(jwt_data.user_id)
    prompt = svc.ai_svc.generate_prompt(stats)
    uni_list = svc.ai_svc.generate_response(prompt)
    for chunk in uni_list:
        print(chunk)
    return {"message": "University list created successfully."}
