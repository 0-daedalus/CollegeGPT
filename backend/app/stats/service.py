from app.config import database
from pydantic import BaseSettings


from .adapters.jwt_service import JwtService
from .repository.repository import StatsRepository
from .adapters.ai_service import AIService


class AuthConfig(BaseSettings):
    JWT_ALG: str = "HS256"
    JWT_SECRET: str = "YOUR_SUPER_SECRET_STRING"
    JWT_EXP: int = 10_800


config = AuthConfig()


class Service:
    def __init__(self, repository: StatsRepository, jwt_svc: JwtService):
        self.repository = repository
        self.jwt_svc = jwt_svc
        self.ai_svc = AIService()


def get_service():
    repository = StatsRepository(database)
    jwt_svc = JwtService(config.JWT_ALG, config.JWT_SECRET, config.JWT_EXP)
    svc = Service(repository, jwt_svc)
    return svc
