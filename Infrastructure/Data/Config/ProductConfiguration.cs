using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Core.Data.ConfigureWebHostDefaults
{
    public class ProducConfiguration : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.Property(p => p.Id).IsRequired();
            builder.Property(p => p.Name).IsRequired().HasMaxLength(100);
            builder.Property(p => p.Description).HasMaxLength(200);
            builder.Property(p => p.Price).HasColumnType("decimal(18,2)");
            builder.HasOne(p => p.ProductBrand).WithMany().HasForeignKey(b => b.ProductBrandId);
            builder.HasOne(p => p.ProductType).WithMany().HasForeignKey(b => b.ProductTypeId);
        }
    }
}