from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Product
from .serializers import ProductSerializer

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def product_list(request):
    if request.method == 'GET':
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'PATCH', 'DELETE'])
@permission_classes([IsAuthenticated])
def product_detail(request, pk):
    try:
        product = Product.objects.get(pk=pk)
    except Product.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ProductSerializer(product)
        return Response(serializer.data)

    elif request.method in ['PUT', 'PATCH']:
        
        serializer = ProductSerializer(product, data=request.data, partial=True) 
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
    elif request.method == 'DELETE':
        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['POST'])
@permission_classes([IsAuthenticated])  
def create_employee(request):
    data = request.data
    
    if not data.get('employee_id') or not data.get('password'):
        return Response({"error": "Employee ID and Password are required."}, status=status.HTTP_400_BAD_REQUEST)
        
    try:
        
        user = User.objects.create_user(
            username=data['employee_id'],
            password=data['password'],
            first_name=data.get('first_name', ''),
            last_name=data.get('last_name', ''),
            email=data.get('email', '')
        )
        return Response({"message": "Employee created successfully!", "id": user.id}, status=status.HTTP_201_CREATED)
        
    except Exception as e:
        return Response({"error": "Employee ID might already exist. " + str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def employee_list(request):
    
    users = User.objects.filter(is_superuser=False).values('id', 'username', 'first_name', 'last_name', 'email')
    return Response(list(users))

@api_view(['PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def manage_employee(request, pk):
    try:
        user = User.objects.get(pk=pk, is_superuser=False)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        user.first_name = request.data.get('first_name', user.first_name)
        user.last_name = request.data.get('last_name', user.last_name)
        user.email = request.data.get('email', user.email)
        user.save()
        return Response({
            'id': user.id, 
            'username': user.username, 
            'first_name': user.first_name, 
            'last_name': user.last_name, 
            'email': user.email
        })

    elif request.method == 'DELETE':
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)