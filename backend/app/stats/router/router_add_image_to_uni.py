from fastapi import Depends, HTTPException, status
from app.utils import AppModel
from typing import Optional, List
from . import router
from ..service import Service, get_service
from ..adapters.jwt_service import JWTData
from .dependencies import parse_jwt_user_data


class AddImageRequest(AppModel):
    name: str
    imageUrl: str


@router.patch("/universities", status_code=status.HTTP_200_OK)
def add_image_to_uni_list(
    data: AddImageRequest,
    jwt_data: JWTData = Depends(parse_jwt_user_data),
    svc: Service = Depends(get_service),
):
    svc.repository.addImageToUni(jwt_data.user_id, data.name, data.imageUrl)
    return {"message": "Image added successfully."}


# "{"name":"University of Texas at Austin","imageUrl":null}"
# "{"name":"University of Illinois at Urbana-Champaign","imageUrl":"https://maps.googleapis.com/maps/api/place/js/PhotoService.GetPhoto?1sAaw_FcJoJXJFO4d7A5uKabFaO0eY8eAjID4zk1FBATWqBLs0wqN5_7yZK4IXE2ZhDhDkJnexMpFgQ1IthXxzH5dbSEJcDo1QCWoyFYk97Ss2Pe_wqz2XMky1FaSa1t0eSjFbmaqi43zHsCBthRjnnvZRllA5qBprLqgLlFxxRTQCqSL8m4xh&3u4032&5m1&2e1&callback=none&key=AIzaSyBqwcZq4Zh0yIXlkBSHVpa1LJie73osHJc&token=63382"}"