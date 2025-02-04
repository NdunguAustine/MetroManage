import secrets
class Generator:
    def __init__(self) -> None:
        self.hashed_string = secrets.token_urlsafe(32)
    def __str__(self) -> str:
        return str(self.hashed_string)
    