using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Umbraco.Cms.Core.Configuration.Models;
using Umbraco.Cms.Core.IO;
using Umbraco.Cms.Core.Packaging;
using Umbraco.Cms.Core.PropertyEditors;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Strings;
using Umbraco.Cms.Infrastructure.Migrations;
using Umbraco.Cms.Infrastructure.Packaging;

namespace TinyMCE.UmbracoCms.Premium.Migrations
{
	public class TinyMceMigrationPlan : PackageMigrationPlan
	{
		public TinyMceMigrationPlan() :
		base("TinyMCE_FirstBoot")
		{ }

		protected override void DefinePlan()
		{
			To<SetupTinyMce>(new Guid("54E3474C-0F11-4AA7-9189-88F7EFE1359C"));

		}
	}


	public class SetupTinyMce : PackageMigrationBase
	{
		public SetupTinyMce(
			IPackagingService packagingService,
			IMediaService mediaService,
			MediaFileManager mediaFileManager,
			MediaUrlGeneratorCollection mediaUrlGenerators,
			IShortStringHelper shortStringHelper,
			IContentTypeBaseServiceProvider contentTypeBaseServiceProvider,
			IMigrationContext context,
			IOptions<PackageMigrationSettings> packageMigrationsSettings)
			: base(packagingService, mediaService, mediaFileManager, mediaUrlGenerators, shortStringHelper, contentTypeBaseServiceProvider, context, packageMigrationsSettings)
		{
		}

		protected override void Migrate()
		{
			// we don't actually need to do anything, but this means we end up
			// on the list of installed packages. 
			// see: https://dev.to/kevinjump/put-your-package-in-the-installed-package-list-in-umbraco-9-11cg
		}
	}
}
