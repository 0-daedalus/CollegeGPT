from fastapi import Depends, HTTPException, status
from app.utils import AppModel
from typing import Optional, List
from . import router
from ..service import Service, get_service
from ..adapters.jwt_service import JWTData
from .dependencies import parse_jwt_user_data


class CreateUniListRequest(AppModel):
    overwrite: bool


@router.post("/universities", status_code=status.HTTP_200_OK)
def create_uni_list(
    data: CreateUniListRequest,
    jwt_data: JWTData = Depends(parse_jwt_user_data),
    svc: Service = Depends(get_service),
):
    stats = svc.repository.get_stats(jwt_data.user_id)
    oldStats = svc.repository.getOldStats(jwt_data.user_id)
    print(stats == oldStats)
    if stats is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No stats found for this user.",
        )
    curr = svc.repository.get_universities(jwt_data.user_id)
    if stats == oldStats and not data.overwrite:
        return curr
    prompt = svc.ai_svc.generate_prompt(stats)
    uni_list = svc.ai_svc.generate_response(prompt)
    svc.repository.add_universities(jwt_data.user_id, uni_list)
    svc.repository.setOldStats(jwt_data.user_id, stats)
    # for chunk in uni_list:
    #     print(chunk)
    return uni_list
