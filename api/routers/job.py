import uuid

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from utils.auth import get_current_user
from db.database import get_db
from models.job import StoryJob
from schemas.job import StoryJobResponse


router = APIRouter(
    prefix="/jobs", tags=["jobs"], dependencies=[Depends(get_current_user)]
)


@router.get("/{job_id}", response_model=StoryJobResponse)
def get_job(job_id: str, db: Session = Depends(get_db)):
    job = db.query(StoryJob).filter(StoryJob.job_id == job_id).first()

    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    return job
