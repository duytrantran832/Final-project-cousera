from django.db import models
from django.conf import settings

# (Giữ nguyên các model cũ của dự án như Course, Lesson, Enrollment...)

class Question(models.Model):
    # Liên kết câu hỏi với bài học (hoặc khóa học tùy theo thiết kế trước đó của bạn)
    # lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
    question_text = models.CharField(max_length=200)
    grade = models.IntegerField(default=1)

    def __str__(self):
        return self.question_text

class Choice(models.Model):
    # Liên kết Choice với Question
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=200)
    is_correct = models.BooleanField(default=False)

    def __str__(self):
        return self.choice_text

class Submission(models.Model):
    # Ghi nhận người dùng nộp bài thông qua Enrollment (hoặc tham chiếu tương tự)
    # enrollment = models.ForeignKey(Enrollment, on_delete=models.CASCADE)
    choices = models.ManyToManyField(Choice)

    def __str__(self):
        return f"Submission {self.id}"